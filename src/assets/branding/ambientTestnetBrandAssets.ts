import { brandAssetsIF } from './types';
import large from '../images/logos/large.svg';

export const ambientTestnetBrandAssets: brandAssetsIF = {
    networks: [
        '0x8274f', // scroll sepolia
        '0xaa36a7', // ethereum sepolia
        '0xa0c71fd', // blast sepolia
    ],
    color: {
        '0x1': 'purple_dark',
        '0x82750': 'purple_dark',
        '0x5': 'purple_dark',
        '0x8274f': 'purple_dark',
        '0xaa36a7': 'purple_dark',
        '0xa0c71fd': 'purple_dark',
        '0x13e31': 'purple_dark',
    },
    platformName: 'ambient',
    headerImage: large as string,
    showPoints: true,
    showDexStats: true,
};
