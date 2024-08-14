import { HomeButton } from "../../components/HomeButton/HomeButton";
import { MessageList } from "../../components/MessageList";
import styles from "./Transactions.module.scss";
import { useState, useEffect } from "react";

export const Transactions = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!messages.length) {
      setTotal(null);
      return;
    }

    setTotal(
      messages.reduce((acc, el) => {
        return acc + el?.x.inputs[0].prev_out.value;
      }, 0)
    );
  }, [messages.length]);

  const handleStart = () => {
    const socket = new WebSocket("wss://ws.blockchain.info/inv");

    socket.onopen = () => {
      const subscribeMessage = JSON.stringify({
        op: "unconfirmed_sub",
      });
      socket.send(subscribeMessage);
    };

    socket.onmessage = (event) => {
      console.log("Отримано повідомлення:", JSON.parse(event.data));
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    };

    socket.onerror = (error) => {
      setError(true);
    };

    setWs(socket);
  };

  const handleReset = () => {
    setMessages([]);
  };

  const handleStop = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const unsubscribeMessage = JSON.stringify({
        op: "unconfirmed_unsub",
      });
      ws.send(unsubscribeMessage);
    }
  };

  return (
    <div className={styles.wrapper}>
      <HomeButton />
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.startButton}`}
          onClick={handleStart}
        >
          Запуск
        </button>
        <button
          className={`${styles.button} ${styles.stopButton}`}
          onClick={handleStop}
        >
          Зупинка
        </button>
        <button
          className={`${styles.button} ${styles.resetButton}`}
          onClick={handleReset}
        >
          Скинути
        </button>
      </div>
      {!!messages.length && <MessageList messages={messages} total={total} />}
      {error && <p className={styles.error}>Помилка WebSocket</p>}
    </div>
  );
};
