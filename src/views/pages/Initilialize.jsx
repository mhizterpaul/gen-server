const Initialize = () => {
    const handleInput = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        fetch('/api/upload/theme', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    return (
        <section>
            <h1>upload theme</h1>
            <h6>zip</h6>
            <input type="file" accept=".zip,.rar,.7zip" onInput={handleInput}/>
            
        </section>
    )
}

export default Initialize;