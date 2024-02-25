import { FC } from 'react';
import { Card, CardProps } from './Card';
import PlayerCardBack from '../assets/PlayerCardBack.jpg';
import { Image } from '@nextui-org/react';
import GemCardFront from '../assets/GemBlank.png';
import RelicCardFront from '../assets/RelicBlank.png';
import SpellCardFront from '../assets/SpellBlank.png';

export type AECardType = 'Gem' | 'Relic' | 'Spell';

interface AECardProps extends Omit<CardProps, 'front' | 'back'> {
    type: AECardType;
}

const getFrontImage = (cardType: AECardType) => {
    switch (cardType) {
        case 'Gem':
            return GemCardFront;

        case 'Relic':
            return RelicCardFront;

        case 'Spell':
            return SpellCardFront;

        default:
            throw new Error('Invalid card type: ' + cardType);
    }
};

export const AECard: FC<AECardProps> = ({ isFaceUp = true, type, ...rest }) => {
    const frontImage = getFrontImage(type);

    return (
        <Card
            isFaceUp={isFaceUp}
            front={<Image src={frontImage} />}
            back={<Image src={PlayerCardBack} />}
            {...rest}
        />
    );
};
