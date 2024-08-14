import styles from "./MessageList.module.scss";

export const MessageList = ({ messages, total }) => {
  return (
    <div className={styles.messages}>
      <span className={styles.totalSum}>Сума: {total}</span>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <td className={styles.tableCell}>From</td>
            <td className={styles.tableCell}>To</td>
            <td className={styles.tableCell}>Sum</td>
          </tr>
        </thead>
        {messages.map((message, index) => (
          <tr className={styles.tableRow} key={index}>
            <td className={styles.tableCell}>
              {message?.x.inputs[0].prev_out.addr}
            </td>
            <td className={styles.tableCell}>{message?.x.out[0].addr}</td>
            <td className={styles.tableCell}>
              {message?.x.inputs[0].prev_out.value}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
