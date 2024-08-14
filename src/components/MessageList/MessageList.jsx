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
        <tbody>
          {[...messages].reverse()?.map((message, index) => (
            <tr className={styles.tableRow} key={index}>
              <td className={styles.tableCell}>{message?.from ?? "N/A"}</td>
              <td className={styles.tableCell}>{message?.to ?? "N/A"}</td>
              <td className={styles.tableCell}>{message?.amount ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
