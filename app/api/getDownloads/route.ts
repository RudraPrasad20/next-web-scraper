import axios from "axios";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json(
      { error: "Package name is required" },
      { status: 400 }
    );
  }

  try {
    console.log("Fetching downloads for:", input);
    const response = await axios.get(`https://www.npmjs.com/package/${input}`);
    const html = response.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const downloads = document.querySelector("._9ba9a726")?.textContent?.trim();
    console.log("Downloads:", downloads);

    if (downloads) {
      return NextResponse.json({ downloads }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Could not find download information" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching downloads:", error);
    return NextResponse.json(
      { error: "Error fetching downloads" },
      { status: 500 }
    );
  }
}
