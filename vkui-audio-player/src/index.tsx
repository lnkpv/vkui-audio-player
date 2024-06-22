import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {
    AdaptivityProvider,
    ConfigProvider, ViewWidth,
} from '@vkontakte/vkui';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <ConfigProvider platform="android">
        <AdaptivityProvider viewWidth={ViewWidth.MOBILE}>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
);