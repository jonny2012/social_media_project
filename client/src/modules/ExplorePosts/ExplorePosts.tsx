import { Box, Container, Typography,Grid2, ImageList, ImageListItem } from "@mui/material"
import { useGetAllPostsQuery } from "../../redux/RTKqueries/postQueries";


export const  ExplorePosts = ({isOpenDrawer}:any)=>{
    const { data:postData, error, isLoading } = useGetAllPostsQuery(undefined);
    return (
        <Container sx={{  padding: 2 } }>
      
        <Box sx={{width:"957px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"3px"}}>
          
          { postData && postData.map((post:any, index:number) => (
        
              <Box
              key={index}
                component="img"
                src={`http://localhost:5000/posts/${post.image}`}    
                alt={`image-${index}`}
                sx={{
                  width: '316px',
                  height: '316px',
                  objectFit:"fill",
       
                }}
              />
       
          ))}
        </Box>
      </Container>
  
      
    )
}