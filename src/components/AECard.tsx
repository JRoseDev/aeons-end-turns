import { Image } from '@nextui-org/react';
import { motion, type Variants } from 'framer-motion';
import { FC } from 'react';
import GemCardFront from '../assets/GemBlank.png';
import PlayerCardBack from '../assets/PlayerCardBack.jpg';
import RelicCardFront from '../assets/RelicBlank.png';
import SpellCardFront from '../assets/SpellBlank.png';
import { AECardState, AECardType } from '../state/AECardState';
import { Card, CardProps } from './Card';

export type AECardProps = Omit<
    CardProps,
    'front' | 'back' | 'facing' | 'initialFacing'
> & {
    card: AECardState;
    onLayoutAnimationStart?: () => void;
    onLayoutAnimationComplete?: () => void;
};

const variants = {
    hover: (card: AECardState) => {
        if (!card.isFaceUp) {
            return { top: '-1rem' };
        }

        return {
            top: '-1rem',
            boxShadow: `0px 0px 5px 4px hsl(var(--ae-${card.owner}))`,
            transition: { duration: 0.3 },
        };
    },
    default: {},
} satisfies Variants;

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
                `../assets/TurnOrder${cardName}.png`,
                import.meta.url
            ).href;

        default:
            throw new Error('Invalid card type: ' + cardType);
    }
};

/**
 * A specific Aeon's End card.
 */
export const AECard: FC<AECardProps> = ({
    card,
    onLayoutAnimationStart,
    onLayoutAnimationComplete,
    ...rest
}) => {
    const frontImage = getFrontImage(card.type, card.cardName);

    return (
        <motion.div
            key={card.id}
            layout
            layoutId={card.id}
            variants={variants}
            whileHover={'hover'}
            custom={card}
            className='relative rounded-sm'
            onLayoutAnimationStart={onLayoutAnimationStart}
            onLayoutAnimationComplete={onLayoutAnimationComplete}
        >
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
        </motion.div>
    );
};
