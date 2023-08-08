type Props = {
  children: React.ReactChild;
};

export default function RootLayout({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-28 xl:px-0">
      {children}
    </div>
  );
}
