import React, {useState} from "react"
import { Box, IconButton, Typography } from "@mui/material"
import {gql, useQuery, useMutation} from '@apollo/client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

const PUBLISH_ASSET = gql`
mutation PublishPhoto($id: ID) {
    publishAsset(where: {id: $id}){
        id
      }
}
`

const CREATE_ITEM = gql`
mutation CreateItem($calories: Int = 10, $itemType: ItemType = Food, $type: String = "Food", $id: ID = "cl6wqg1na7h0h0alol5ov0m9o") {
    createItem(
      data: {calories: $calories, itemType: $itemType, type: $type, photo: {connect: {id: $id}}}
    ) {
      id
    }
  }
`

const PUBLISH_ITEM = gql`
mutation PublishItem($id: ID ) {
    publishItem(where: {id: $id}) {
      id
    }
  }
`

// const PUBLISH_ASSET = gql`
// mutation MyMutation {
//     publishItem(where: {id: "cl6wz806pbr970blmyre4p2v6"})
//   }
// `



const TakePicture = ({pictureType}) => {

    const [calories, setCalories] = useState(0)
    const [sodium, setSodium] = useState(0)
    const [weight, setWeight] = useState(0.0)
    const [imageData, setImageData] = useState()

    const [publishPhotoFunction, { data: assetData, loading: assetLoading, error:assetError }] = useMutation(PUBLISH_ASSET)
    const [createItemFunction, { data: itemData, loading: itemLoading, error:itemError }] = useMutation(CREATE_ITEM)
    const [publishItemFunction, { data: itemPubData, loading: itemPubLoading, error:itemPubError }] = useMutation(PUBLISH_ITEM)

    const inputStyle = {
        display: 'none'
    }

 

    const uploadPicture = async (theImageData) => {
        const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjA2ODY1ODQsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w2d3BxMmtiNGtkZjAxdDY4aTZkZTJwcy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNTkxNGQ4ZDctZDBiZS00MzcwLTgwYTEtZDY0MzVkZWY4ZWFmIiwianRpIjoiY2w2d3B3eHBiNGtvMjAxdDZjcjZ6OTFndyJ9.hwZs2YFn5TMijj__LzS2WJ0ns1wOEDIHDXcLw1JSjWMT2X_ECNdb5WRK3YodwkV-DfG90cgtJ0Lt-vv2Yt7H6rPnKK5IFqeK5Dw9YC_JfhVw3wisaa5x_AQU3p1j5y0i4LR5PjFExbKhMlJ0aEGuZK9sSDklEtD0dJ_T869l--RLJfqKm4PjqgEOUU6Ed6RxEFd-jjRn90q2fY1nTLP2YYFWorzYGgDKGrg76Yo8U4Hai2V8y9jdSvAsQMiRD6PLNFMgKQ9G1-fUJspZbZwLGEZ7xUiIvzEvID9xBPTv35kXqBzGmD2kOvVZuYRUxtHepjEmKFb8AkG8KJrwQC6_HWrCnARaaRd5RhjijhucHe6HwI_3kvjJP1Y1qEmQciwMghnd8rz96sHqZ1HGduxpJfjrYpsZ8TNmBJ-7MY14DPmV9H-iCGyTxg3puQXSUxinmA_-gn38a_fWcU0HMbFTT3DFpjto166G76dnpHHx2LsCLZGmJLMU4dKvFF_m2_gLwESf-4o9vc01DGxqNKVuC1-VlsnIwsOi5yaEecrBPPWfkjJTkXIPPcdI8e0E1sWx9Cn0OzdJ2EVE8SIl46PkdEPKvASHwes9BndKUsK5cdnxr7BtBMC-V5ilgYF5CvTMlXWWEUl-17EakSm1GLJowK4yzLgEtOi8mn-KXNpTZ78'
        console.log(theImageData)
        const form = new FormData()

        form.append('fileUpload', theImageData)

        const response = await fetch('https://api-us-west-2.hygraph.com/v2/cl6wpq2kb4kdf01t68i6de2ps/master/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: form,
        });

        const asset = await response.json()

        //publish photo (use asset id)
        //uploadAsset(asset.id)
        console.log(asset)
        console.log("asset.id", asset.id)
        publishPhotoFunction(
            {
              variables : {
                "id": asset.id
              }
            }
          )
        //publishPhotoFunction()


        //create item (get item id)
        const itemResponse = await createItemFunction(
            {
              variables : {
                "calories": 500,
                "itemType" : "Food",
                "type" : "food",
                "id" : asset.id
              }
            }
          )
        
        console.log("itemResponse: ", itemResponse.data.createItem.id)
        //publish item (using item id)
        
        publishItemFunction(
            {
              variables : {
                "id": itemResponse.data.createItem.id
              }
            }
          )


        //console.log(asset)

    }
    return(
        <>
      

        <Box sx={{mt:10}}>
            {
                (imageData) ? (
                        <>
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent:"center",alignItems: "center",
                                fontSize: '4vh',
                                color: '#1976d2'
                            }} >
                            <CheckCircleIcon style={{  fontSize: "100" }}  />
                            <div  >Got Picture</div>
                        </Box>
                        
                        </>
                ) : (
                    <>
                    <input style={inputStyle} accept="image/*"  id="icon-button-file" type="file" capture="environment" onChange={e => {
                        setImageData(e.target.files[0])
                        uploadPicture(e.target.files[0])
                        }} />
                    <label htmlFor="icon-button-file">
                        <IconButton 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '4vh',
                            }} 
                            color="primary" 
                            aria-label="upload picture" 
                            component="span" >
                            <AddAPhotoIcon style={{  fontSize: "100" }}  />
                            <div  >Take Picture</div>
                        </IconButton>
                    </label>
                    </>
                )
            } 
        </Box>
        
        </>
    )
   

}

export default TakePicture