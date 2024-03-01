import type { AddToastProps, Toast } from '@melt-ui/svelte';

export { default as Toaster } from './Toaster.svelte';

export type ToastData = App.FlashMessage;


export type ToasterContext = {
    addToast: (props: AddToastProps<ToastData>) => Toast<ToastData>;
}