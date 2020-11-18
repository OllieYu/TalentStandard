/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Button, Icon, Image } from 'semantic-ui-react';


export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newFile: null,
            newFileUrl: null,
            hasData: false
        }
       this.showPreview = this.showPreview.bind(this)
       this.loadData = this.loadData.bind(this)
    };


    showPreview(e){
        let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        let selectedFile = e.target.files[0];
        console.log(e.target.files[0]);
        if (this.state.newFile) {
            URL.revokeObjectURL(newFile);
        }
        if (acceptedExt.includes(selectedFile.type)) {
            this.setState({
                uploadButton: "",
                newFileUrl: URL.createObjectURL(e.target.files[0]),
                newFile: e.target.files[0],
                hasData:true
            })
        }
        // if(e.target.files && e.target.files[0]){
        //     let imageFile = e.target.files[0]
        //     const reader = new FileReader()
        //     reader.onload = x =>{
        //         this.setState({
        //             imageFile: imageFile,
        //             imageSrc: x.target.result,
        //             hasData: true
        //         })
        //     }
        //     reader.readAsDataURL(imageFile)
        // }
        // console.log(e.target.files)
    }

    loadData() {
        var formDate = new FormData()
        let file = this.state.newFile
        formDate.append("photo", file)

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'content-type': 'multipart/form-data'
            },
            contentType: false,
            cache: false,
            processData: false,
            data: formDate,
            type: "POST",
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                   
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }
            }.bind(this),
            error: function(data){
                console.log(data)
            }
        })
    }

    render() {
        return(
            <div>
            <div className='ui sixteen wide column'>
                <input type="file" id="file" style = {{display:'none'}} onChange={this.showPreview}/>
                <label htmlFor="file">{this.state.hasData ?
                <Image style={{objectFit:'cover', width:'8rem', height:'8rem'}} src={this.state.newFileUrl} size='small' circular/> 
                : <Icon size='huge' circular name='camera retro'/>}</label>
            </div>
            <br/>
            {/* <Image src={require('../../../../../../../Talent.Services.Profile/images/637412432676321060_1.jpg')}/> */}
            <Button secondary type='button' onClick={this.loadData}><Icon name='upload'/>Upload</Button>
            </div>
        )
    }
}
