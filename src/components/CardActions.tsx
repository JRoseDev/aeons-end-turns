import { Button } from '@nextui-org/react';
import type { FC } from 'react';
import type { Action } from '../state/Reducer';
import type { AECardState } from '../state/AECardState';

interface CardActionsProps {
    card: AECardState;
    onAction: (
        action: Action & {
            type: 'cardToTop' | 'cardToBottom' | 'shuffleCardIntoDeck';
        }
    ) => void;
}

export const CardActions: FC<CardActionsProps> = ({ card, onAction }) => {
    return (
        <>
            <Button
                onClick={() => {
                    onAction({ type: 'cardToTop', card });
                }}
            >
                To Top
            </Button>
            <Button
                onClick={() => {
                    onAction({ type: 'shuffleCardIntoDeck', card });
                }}
            >
                Shuffle In
            </Button>
            <Button
                onClick={() => {
                    onAction({ type: 'cardToBottom', card });
                }}
            >
                To Bottom
            </Button>
        </>
    );
};
