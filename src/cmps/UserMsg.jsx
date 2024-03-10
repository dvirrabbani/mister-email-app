import { useEffect, useState } from 'react';
import { eventBusService } from './../services/event-bus.service';
import { MdClose as CloseIcon } from 'react-icons/md';

export function UserMsg() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg);
      setTimeout(onCloseMsg, 30000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function onCloseMsg() {
    setMsg(null);
  }

  if (!msg) return <></>;
  return (
    <div className={'user-msg ' + msg.type}>
      <button onClick={onCloseMsg}>
        <CloseIcon />
      </button>
      <p>{msg.txt}</p>
    </div>
  );
}
