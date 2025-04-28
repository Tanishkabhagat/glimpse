// pages/api/links.js

let links = [
    { title: "Family BBQ Video", url: "https://youtube.com/xyz123" },
    { title: "Vacation Highlights", url: "https://youtube.com/abc456" },
  ]; // You can replace this with actual database logic later.
  
  export default function handler(req, res) {
    if (req.method === "GET") {
      // Return the list of links
      res.status(200).json(links);
    } else if (req.method === "POST") {
      // Add a new link
      const { title, url } = req.body;
      links.push({ title, url });
      res.status(200).json(links);
    } else if (req.method === "DELETE") {
      // Delete a link
      const { title } = req.body;
      links = links.filter((link) => link.title !== title);
      res.status(200).json(links);
    } else {
      // Method not allowed
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  