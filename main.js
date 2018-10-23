//Constructor function to create content objects
//A comment widget is added to a content element
function Content(content, id) {
    this.content = content;
    this.elem = '';
    this.id = id;
}

Content.prototype.createContentDiv = function() {
    const div = document.createElement('div');
    div.style.width = "60%";
    div.style.marginTop = "3%";
    div.id = this.id;
    const img = document.createElement('img');
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    img.src = this.content;
    div.appendChild(img)
    this.elem = div;
}

Content.prototype.appendContentDiv = function() {
    document.body.appendChild(this.elem);
}

Content.prototype.state = [];

function newPost() {
    //creates a content element using a random image
    let content = new Content(`images/pic${Math.ceil(Math.random()*3)}.jpg`, `content${Content.prototype.state.length}`);
    content.createContentDiv();
    content.appendContentDiv();
    //attaches a comment widget to the created content
    let comment = new Comment(`content${Content.prototype.state.length}`, `comment${Content.prototype.state.length}`);
    comment.createCommentElement();
    
    //holds state of all content and comment objects created
    //can be stored on a DB and used to recreate the content and comments
    Content.prototype.state.push({content, comment});
}