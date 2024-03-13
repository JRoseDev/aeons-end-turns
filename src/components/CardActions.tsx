import { Button } from '@nextui-org/react';
import type { FC } from 'react';
import { LuArrowDownToLine, LuArrowUpToLine } from 'react-icons/lu';
import { TbCards } from 'react-icons/tb';
import type { AECardState } from '../state/AECardState';
import type { Action } from '../state/Reducer';

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
                <LuArrowDownToLine size={20} /> Top
            </Button>
            <Button
                onClick={() => {
                    onAction({ type: 'shuffleCardIntoDeck', card });
                }}
            >
                <TbCards size={20} /> Shuffle In
            </Button>
            <Button
                onClick={() => {
                    onAction({ type: 'cardToBottom', card });
                }}
            >
                <LuArrowUpToLine size={20} /> Bottom
            </Button>
        </>
    );
};
