import { FC } from 'react';
import { Card } from './Card';
import PlayerCardBack from '../assets/PlayerCardBack.jpg';
import { Image } from '@nextui-org/react';
import GemCardFront from '../assets/GemBlank.png';
import RelicCardFront from '../assets/RelicBlank.png';
import SpellCardFront from '../assets/SpellBlank.png';

type AECardType = 'Gem' | 'Relic' | 'Spell';

interface CardProps {
    isFaceUp?: boolean;
    type: AECardType;
    onClick?: (isFaceUp: boolean) => void;
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

export const AECard: FC<CardProps> = ({ isFaceUp = true, type, onClick }) => {
    const frontImage = getFrontImage(type);

    return (
        <Card
            isFaceUp={isFaceUp}
            front={<Image src={frontImage} />}
            back={<Image src={PlayerCardBack} />}
            onClick={onClick}
        />
    );
};
