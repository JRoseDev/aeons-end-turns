import { Image } from '@nextui-org/react';
import { FC, Fragment } from 'react';
import GemCardFront from '../assets/GemBlank.png';
import PlayerCardBack from '../assets/PlayerCardBack.jpg';
import RelicCardFront from '../assets/RelicBlank.png';
import SpellCardFront from '../assets/SpellBlank.png';
import { AECardState, AECardType } from '../state/AECardState';
import { Card, CardProps } from './Card';
import { Move } from '../animations/Move';

export type AECardProps = Omit<
    CardProps,
    'front' | 'back' | 'facing' | 'initialFacing'
> & { card: AECardState };

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

/**
 * A specific Aeon's End card.
 */
export const AECard: FC<AECardProps> = ({ card, ...rest }) => {
    const frontImage = getFrontImage(card.type, card.cardName);

    const cardElement = (
        <Card
            front={
                <Image
                    classNames={{ wrapper: '!max-w-full w-full h-full' }}
                    className='object-fill w-full h-full rounded-md'
                    src={frontImage}
                />
            }
            back={<Image className='rounded-md' src={PlayerCardBack} />}
            facing={card.isFaceUp ? 'faceUp' : 'faceDown'}
            initialFacing={card.wasFaceUp ? 'faceUp' : 'faceDown'}
            scale={2}
            {...rest}
        />
    );

    if (card.animation == null) {
        return <Fragment key={card.id}>{cardElement}</Fragment>;
    }

    return (
        <Move key={card.id} {...card.animation}>
            {cardElement}
        </Move>
    );
};
