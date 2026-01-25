export default function Footer() {
  return (
    <footer style={{ padding: "12px 16px", borderTop: "1px solid #ddd", textAlign: "center" }}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} StudyMate — Find Your Perfect Study Partner
      </p>
    </footer>
  );
}
