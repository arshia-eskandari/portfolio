export default function Footer() {
  return (
    <footer className="bg-primary py-4 text-white">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Arshia Eskandari. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
