import { HomeButton } from "../../components/HomeButton/HomeButton";
import styles from "./Transactions.module.scss";
import useWebSocket from "react-use-websocket";
import { TableData } from "../../components/TableData";
import { useState } from "react";

export const Transactions = () => {
  const {
    sendMessage,
    lastMessage,
    sendJsonMessage,
    getWebSocket,
    lastJsonMessage,
    readyState,
  } = useWebSocket("wss://ws.blockchain.info/inv");

  return (
    <div className={styles.wrapper}>
      <HomeButton />
      <TableData
        webSocket={{
          sendMessage,
          lastMessage,
          sendJsonMessage,
          getWebSocket,
          lastJsonMessage,
          readyState,
        }}
      />
    </div>
  );
};
