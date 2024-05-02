interface Props {
  children: React.ReactNode;
}
export default function TableContainer({ children }: Props) {
  return (
    <>
      <h2>내 시간표</h2>
      <table>{children}</table>
    </>
  );
}
