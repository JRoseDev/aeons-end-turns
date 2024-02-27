import { FC } from 'react';
import { Card, CardProps } from './Card';
import PlayerCardBack from '../assets/PlayerCardBack.jpg';
import { Image } from '@nextui-org/react';
import GemCardFront from '../assets/GemBlank.png';
import RelicCardFront from '../assets/RelicBlank.png';
import SpellCardFront from '../assets/SpellBlank.png';
import { AECardType } from '../state/AECardState';

interface AECardProps extends Omit<CardProps, 'front' | 'back'> {
    type: AECardType;
    cardName?: string;
}

const getFrontImage = (cardType: AECardType, cardName?: string) => {
    switch (cardType) {
        case 'gem':
            return GemCardFront;

        case 'relic':
            return RelicCardFront;

        case 'spell':
            return SpellCardFront;

        case 'turnOrder':
            return new URL(
                `../assets/TurnOrder${cardName}.webp`,
                import.meta.url
            ).href;

        default:
            throw new Error('Invalid card type: ' + cardType);
    }
};

export const AECard: FC<AECardProps> = ({ type, cardName, ...rest }) => {
    const frontImage = getFrontImage(type, cardName);

    return (
        <Card
            front={
                <Image
                    classNames={{ wrapper: '!max-w-full w-full h-full' }}
                    className='object-fill w-full h-full'
                    src={frontImage}
                />
            }
            back={<Image src={PlayerCardBack} />}
            {...rest}
        />
    );
};
