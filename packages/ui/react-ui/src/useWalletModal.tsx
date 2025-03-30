import { createContext, useContext } from 'react';

export interface WalletModalContextState {
    visible: boolean;
    setVisible: (open: boolean) => void;
    termsUrl: string | undefined;
}

const DEFAULT_CONTEXT = {
    setVisible(_open: boolean) {
        console.error(constructMissingProviderErrorMessage('call', 'setVisible'));
    },
    visible: false,
    termsUrl: undefined,
};
Object.defineProperty(DEFAULT_CONTEXT, 'visible', {
    get() {
        console.error(constructMissingProviderErrorMessage('read', 'visible'));
        return false;
    },
});

function constructMissingProviderErrorMessage(action: string, valueName: string) {
    return (
        'You have tried to ' +
        ` ${action} "${valueName}"` +
        ' on a WalletModalContext without providing one.' +
        ' Make sure to render a WalletModalProvider' +
        ' as an ancestor of the component that uses ' +
        'WalletModalContext'
    );
}

export const WalletModalContext = createContext<WalletModalContextState>(DEFAULT_CONTEXT as WalletModalContextState);

export function useWalletModal(): WalletModalContextState {
    const context = useContext(WalletModalContext);

    if (!context.termsUrl || !context.termsUrl.length) {
        throw new Error('You must provide a `termsUrl` prop to the `WalletModalProvider`.');
    }

    return context;
}
