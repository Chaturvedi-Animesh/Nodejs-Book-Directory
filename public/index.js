function del(_id,photoAddress){

    const response=fetch('/delete', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id:_id,
          address:photoAddress

        })
      })

      response.then((rep)=>{
          if(rep.status==200){
              location.reload()
          }
          else{
              alert("unable to delete")
          }
      })

}
