import React, { useEffect, useState } from "react";
import { MessageList } from "../MessageList";
import styles from "./TableData.module.scss";

const extractTransactionDetails = (transaction) => ({
  from: transaction.x.inputs[0]?.prev_out?.addr ?? null,
  to: transaction.x.out[0]?.addr ?? null,
  amount: transaction.x.out[0]?.value ?? null,
});

export const TableData = ({ webSocket }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    return () => {
      const websocket = webSocket.getWebSocket();
      if (websocket) {
        websocket.close();
      }
    };
  }, [webSocket.getWebSocket]);

  useEffect(() => {
    if (webSocket.lastMessage && webSocket.lastMessage?.data) {
      const data = JSON.parse(webSocket.lastMessage.data);
      const item = extractTransactionDetails(data);
      setItems((prev) => prev.concat(item));
    }
  }, [webSocket.lastMessage]);

  useEffect(() => {
    if (!items.length) {
      setTotal(null);
      return;
    }

    setTotal(
      items.reduce((acc, el) => {
        return acc + el.amount;
      }, 0)
    );
  }, [items.length]);

  const handleClickSubscribe = () => {
    webSocket.sendMessage(JSON.stringify({ op: "unconfirmed_sub" }));
  };

  const handleClickUnsubscribe = () =>
    webSocket.sendMessage(JSON.stringify({ op: "unconfirmed_unsub" }));

  const handleClickReset = () => setItems([]);

  return (
    <>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.startButton}`}
          onClick={handleClickSubscribe}
        >
          Запуск
        </button>
        <button
          className={`${styles.button} ${styles.stopButton}`}
          onClick={handleClickUnsubscribe}
        >
          Зупинка
        </button>
        <button
          className={`${styles.button} ${styles.resetButton}`}
          onClick={handleClickReset}
        >
          Скинути
        </button>
      </div>
      {!!items?.length && <MessageList messages={items} total={total} />}
    </>
  );
};
