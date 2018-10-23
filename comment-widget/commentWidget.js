
//constructor function to create comment objects
//arguments - id of elem where comment div has to be attached and id for comment div
function Comment(attachedContentId, id) {
    //initialised to id of element where comment has to be attached
    this.attachedContentId = attachedContentId;
    //initialised to id of comment div
    this.id = id;
    //text of comments and corresponding replies
    this.commentContent = [];
    //parent element containing comment button, and comments input by the user
    this.elem = '';

    //stores comment display div so that it can be removed from DOM on every re-render
    this.commentDisplayDiv = '';

    //storing input field used to add new comment. Used in createCommentInput where display property of this element is toggled from none to block
    this.addCommentInput = '';
}
//creates a parent div to hold comment button, comment content and replies
Comment.prototype.createCommentElement = function() {
    //creating the parent div
    const div = document.createElement('div');
    div.id = this.id;
    div.className = "commentDiv";
    
    //creating button to display input for adding new comments
    const commentButtonDiv = document.createElement('div');
    commentButtonDiv.className = 'commentButtonDiv';
    
    const commentIconDiv = document.createElement('div');
    commentIconDiv.className = "commentIconDiv";
    const commentIcon = document.createElement('img');
    commentIcon.src = './comment-widget/icons/comment-white-oval-bubble.png';
    commentIconDiv.appendChild(commentIcon);
    commentButtonDiv.appendChild(commentIconDiv);
    
    const button = document.createElement('button');
    button.innerText = 'Comment';
    button.addEventListener('click', () => { this.createCommentInput(); }, false);
    commentButtonDiv.appendChild(button);
    
    div.appendChild(commentButtonDiv);
    this.elem = div;

    //creating input field to add new comment and initialising its display to none
    const inputDiv = document.createElement('div');
    inputDiv.style.display = 'none';
    const input = document.createElement('input');
    input.placeholder = 'Write a comment...';
    //comment gets added on pressing enter while input field is focused
    input.addEventListener('keypress', (event) => {
        if(event.keyCode == 13){
            this.addComment(input.value);
            this.renderComments();
            input.value = '';
        }
    })
    inputDiv.appendChild(input);

    //storing the input field element(used to add new comment) to toggle its display from none to block in createCommentInput function
    this.addCommentInput = inputDiv;
    this.elem.appendChild(inputDiv);
    document.getElementById(this.attachedContentId).appendChild(this.elem);
}

//toggle display property of input field element
Comment.prototype.createCommentInput = function() {
    this.addCommentInput.style.display = 'block';
    this.addCommentInput.getElementsByTagName('input')[0].focus();
}

//add a new comment
Comment.prototype.addComment = function(content) {
    this.commentContent.push({content, reply: []});
}

//render all comments and replied that have been added
Comment.prototype.renderComments = function() {
    //remove previous state of comment div if it already exists
    if(this.commentDisplayDiv)
        this.commentDisplayDiv.remove();
    
    const div = document.createElement('div');
    div.className = "commentContentParent";

    //create a div for each element
    for(let i=0; i<this.commentContent.length; i++){
        const commentDiv = document.createElement('div');
        const commentTextDiv = document.createElement('div');
        commentTextDiv.className = "commentText";
        commentTextDiv.innerText = this.commentContent[i].content;
        commentDiv.appendChild(commentTextDiv);

        const replyButtonDiv = document.createElement('div');
        replyButtonDiv.className = "replyButtonDiv";
        const button = document.createElement('button');
        button.innerText = "Reply";
        replyButtonDiv.appendChild(button);
        commentDiv.appendChild(replyButtonDiv);
        
        //input field element to add a reply
        const replyInputDiv = document.createElement('div');
        replyInputDiv.style.display = "none";
        replyInputDiv.className = "replyInputDiv";
        const input = document.createElement('input');
        input.placeholder = 'Write a reply...';
        input.addEventListener('keypress', (event) => {
            if(event.keyCode === 13){
                this.addReply(input.value, i);
                this.renderComments();
                input.value = '';
            }
        })
        replyInputDiv.appendChild(input);
        button.addEventListener("click", () => {
            replyInputDiv.style.display = 'block';
            input.focus();
        });
        commentDiv.appendChild(replyInputDiv);

        //render replies for comments if any
        if(this.commentContent[i].reply.length){
            const replyDiv = document.createElement('div');
            replyDiv.className = "replyDiv";
            for(let reply of this.commentContent[i].reply){
                const replyTextDiv = document.createElement('div');
                replyTextDiv.className = "commentText";
                replyTextDiv.innerText = reply;
                replyDiv.appendChild(replyTextDiv);
            }
            commentDiv.appendChild(replyDiv);
        }
        div.appendChild(commentDiv);
    }
    this.elem.appendChild(div);
    this.commentDisplayDiv = div;
}

//add a new reply for a comment
Comment.prototype.addReply = function(reply, i) {
    this.commentContent[i].reply.push(reply);
    this.renderComments();
}