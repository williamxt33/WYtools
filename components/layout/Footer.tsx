import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] border-t border-border">
      <div className="max-w-200 mx-auto py-10 px-6 flex flex-row justify-between items-start gap-12 max-lg:flex-col max-lg:gap-8">
        <div className="flex flex-col gap-3 max-w-70 max-lg:max-w-full">
          <Image src="/icons/full_logo.png" alt="WYTools logo" height={50} width={140} />
          <p className="text-[0.85rem] text-muted leading-[1.65]">
            WYTools is a one-stop shop for your daily needs on the internet and provides all sorts of
            variety of tools to choose from. From converters, generators and calculators, WYTools contains
            the broadest tools across the internet with one goal in mind — to make our daily lives more convenient.
          </p>
        </div>

        <div className="flex flex-col shrink-0">
          <h3 className="text-base font-semibold text-foreground mb-[0.85rem]">Navigate</h3>
          <ul className="list-none flex flex-col gap-[0.55rem]">
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">Home</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">Privacy Policy</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">TOS</Link></li>
            <li><Link href="/about" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">About</Link></li>
          </ul>
        </div>

        <div className="flex flex-col shrink-0">
          <h3 className="text-base font-semibold text-foreground mb-[0.85rem]">Featured Tools</h3>
          <ul className="list-none flex flex-col gap-[0.55rem]">
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">Groups Generator</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">Wheel Spin Generator</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">BMI Calculator</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-foreground">Mortgage Calculator</Link></li>
          </ul>
        </div>
      </div>

      <div className="bg-[#f5f5f5] text-center pb-[0.9rem] text-[0.8rem] text-muted before:content-[''] before:block before:max-w-200 before:mx-auto before:px-6 before:border-t before:border-[#c8c8c8] before:pt-[0.9rem]">
        © {new Date().getFullYear()} WYTools. All rights reserved.
      </div>
    </footer>
  )
}
