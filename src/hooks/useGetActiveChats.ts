import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import sse from '../services/sse.service';
import { Chat } from '../model/chat.model';
import { setActiveChats } from '../slices/chats.slice';

const useGetActiveChats = (): void => {
  const { customerSupportId } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onMessage = (data: Chat[]) => {
      if (data !== undefined) {
        dispatch(setActiveChats({ customerSupportId, data, checkNewMessages: true }));
      }
    };

    const events = sse('cs-get-all-active-chats', onMessage);

    return () => {
      events.close();
    };
  }, [customerSupportId, dispatch]);
};

export default useGetActiveChats;
