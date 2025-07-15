import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

function Blogpage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.spaceflightnewsapi.net/v4/blogs/');
      const result = await response.json();
      setData(result.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {loading && <Typography>Loading blogs...</Typography>}
      {!loading && data.length === 0 && <Typography>No blogs found.</Typography>}
      
      {!loading && data.map((blog) => (
        <Card key={blog.id} className="w-full max-w-md mx-auto">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={blog.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={blog.title}
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {blog.title}
            </Typography>
            <Typography className="line-clamp-3 text-sm text-gray-700">
              {blog.summary}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 ">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              <Button className='bg-cyan-500 '>Read More</Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Blogpage;
