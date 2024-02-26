import { FC } from 'react';
import { Card, CardProps } from './Card';
import PlayerCardBack from '../assets/PlayerCardBack.jpg';
import { Image } from '@nextui-org/react';
import GemCardFront from '../assets/GemBlank.png';
import RelicCardFront from '../assets/RelicBlank.png';
import SpellCardFront from '../assets/SpellBlank.png';
import { AECardType } from '../model/AECardModel';

interface AECardProps extends Omit<CardProps, 'front' | 'back'> {
    type: AECardType;
}

const getFrontImage = (cardType: AECardType) => {
    switch (cardType) {
        case 'gem':
            return GemCardFront;

        case 'relic':
            return RelicCardFront;

        case 'spell':
            return SpellCardFront;

        default:
            throw new Error('Invalid card type: ' + cardType);
    }
};

export const AECard: FC<AECardProps> = ({ type, ...rest }) => {
    const frontImage = getFrontImage(type);

    return (
        <Card
            front={<Image src={frontImage} />}
            back={<Image src={PlayerCardBack} />}
            {...rest}
        />
    );
};
