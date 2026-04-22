/// <reference types="vite/client" />
declare const __API_BASE__: string;

type TurnstileRenderOptions = {
	sitekey: string;
	callback?: (token: string) => void;
	'expired-callback'?: () => void;
	'error-callback'?: () => void;
};

type TurnstileApi = {
	render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
	reset: (widgetId?: string) => void;
	remove?: (widgetId: string) => void;
};

interface Window {
	turnstile?: TurnstileApi;
}
