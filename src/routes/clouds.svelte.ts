import {throttle} from "$lib/utils";
import fragmentShader from "./clouds.frag";
// @ts-expect-error
import {FullScreenQuad} from "three/examples/jsm/postprocessing/Pass";
import {Camera, Color, PerspectiveCamera, ShaderMaterial, Vector2, Vector3, WebGLRenderer} from "three";
import {THEME_DARK, ThemeStore} from "$lib/client/stores/ThemeStore.svelte";

class Cloud extends FullScreenQuad {
    material: ShaderMaterial;
    position: Vector3;

    constructor({
        cloudSize = new Vector3(0.5, 1.0, 0.5),
        sunPosition = new Vector3(20.0, 50.0, 20.0),
        cloudColor = new Color(0xF8F8FF),
        cloudSteps = 32,
        shadowSteps = 24,
        cloudLength = 24,
        shadowLength = 20,
        position = new Vector3(0, 0, 0),
    } = {}) {
        const material = new ShaderMaterial({
            uniforms: {
                uCloudSize: {
                    value: cloudSize,
                },
                uSunPosition: {
                    value: sunPosition,
                },
                uCameraPosition: {
                    value: new Vector3(),
                },
                uCloudColor: {
                    value: cloudColor,
                },
                uCloudSteps: {
                    value: cloudSteps,
                },
                uShadowSteps: {
                    value: shadowSteps,
                },
                uCloudLength: {
                    value: cloudLength,
                },
                uShadowLength: {
                    value: shadowLength,
                },
                uResolution: {
                    value: new Vector2(),
                },
                uTime: {
                    value: 0,
                },
                projectionMatrixInverse: {
                    value: null,
                },
                viewMatrixInverse: {
                    value: null,
                },
            },
            fragmentShader,
        });

        super(material);
        this.material = material;
        this.position = position;
    }

    get cloudSize() {
        return this.material.uniforms.uCloudSize.value;
    }

    get sunPosition() {
        return this.material.uniforms.uSunPosition.value;
    }

    get time() {
        return this.material.uniforms.uTime.value;
    }

    set time(value) {
        this.material.uniforms.uTime.value = value;
    }

    setSize(width: number, height: number) {
        this.material.uniforms.uResolution.value.set(width, height);
    }

    render(renderer: WebGLRenderer, camera: Camera) {
        this.material.uniforms.uCameraPosition.value.copy(camera.position).add(this.position);
        this.material.uniforms.projectionMatrixInverse.value = camera.projectionMatrixInverse;
        this.material.uniforms.viewMatrixInverse.value = camera.matrixWorld;
        super.render(renderer);
    }
}

export function initClouds(container: HTMLDivElement) {
    $effect(() => {
        const renderer = new WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            alpha: true, // Enable transparency
        });
        container.appendChild(renderer.domElement);

        const camera = new PerspectiveCamera(40);
        camera.position.set(0, 0, 20);
        camera.lookAt(0, 0, 0);

        // generate random clouds
        function generateClouds(count: number): Cloud[] {
            const isDarkTheme = ThemeStore.theme === THEME_DARK;
            const cloudColor = isDarkTheme
                ? new Color(0x5C687C)
                : new Color(0xF8F8FF);
            const clouds: Cloud[] = [];
            for (let i = 0; i < count; i++) {
                const cloud = new Cloud({
                    cloudColor,
                    cloudSize: new Vector3(
                        Math.random() + 1.5,
                        Math.random() + 0.2,
                        Math.random() + 0.5,
                    ),
                    position: new Vector3(
                        Math.random() * 20 - 10,
                        Math.random() * -3 - 1,
                        0,
                    ),
                });
                clouds.push(cloud);
            }
            return clouds;
        }

        function renderClouds(clouds: Cloud[], dpr: number) {
            for (let i = 0; i < clouds.length; i++) {
                clouds[i].render(renderer, camera);
                clouds[i].setSize(window.innerWidth * dpr, window.innerHeight * dpr);
            }
        }

        const clouds = generateClouds(1);

        const handleResize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            renderer.setPixelRatio(dpr);
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderClouds(clouds, dpr);
        };

        const handleResizeThrottled = throttle(handleResize, 100);

        handleResize();
        window.addEventListener("resize", handleResizeThrottled);

        // Initial render
        renderClouds(clouds, Math.min(window.devicePixelRatio, 2));

        renderer.setAnimationLoop((time) => {
            for (let i = 0; i < clouds.length; i++) {
                clouds[i].time = time / 1000;
            }
        });

        return () => {
            window.removeEventListener("resize", handleResizeThrottled);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    });
}