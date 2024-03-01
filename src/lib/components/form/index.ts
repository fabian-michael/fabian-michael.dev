import type { SuperForm } from 'sveltekit-superforms';

export { default as Form } from './Form.svelte';
export { default as Input } from './Input.svelte';

export type FormContext = Pick<SuperForm<any>, 'form' | 'errors' | 'constraints'>
