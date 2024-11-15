<script>
export default {
    data() {
        return {
            todos: [],
            todoInput: '',
            draggingIndex: null,
            tag: 'white',
            totalTodos: 0,
            filter: false,    
            todoBackup: [],
            showTagTodo: false
        }
    },
    methods: {
        addTodo() {
            const input = this.todoInput.trim();

            if (input === '') {
                return
            }
            if (this.todos.find(e => e.name === input)) {
                window.alert(input + ' , already exists!');
                return
            }

            this.todos.push({
                name: this.todoInput,
                completed: false,
                dueDate: "no due date",
                tag: this.tag,
                isFavorite: false,
                showTagOptions: false
            })
            this.todoInput = '' //reset input to empty
            this.totalTodos = this.totalTodos + 1
        },
        deleteTodo(index) {
            this.todos.splice(index, 1) //the second argument here specifies how many elements to remove
            this.totalTodos = this.totalTodos - 1
        },
        tagTodo(index) {
            this.todos[index].tag = 'purple'
        },
        startDrag(event, index) {
            this.draggingIndex = index
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', index);
        },
        onDrop(targetIndex) {
            if (this.draggingIndex !== null) {
                const draggedItem = this.todos[this.draggingIndex];
                this.todos.splice(this.draggingIndex, 1);
                this.todos.splice(targetIndex, 0, draggedItem);
                this.draggingIndex = null;
            }
        },
        filterFavs() {
            this.filter = !this.filter

            if (this.filter) {
                this.todoBackup = this.todos // store what was there before
                this.todos = this.todos.filter(t => t.isFavorite)
            } else {
                this.todos = this.todoBackup
            }                
        },
        toggleFav(index) {
            this.todos[index].isFavorite = !this.todos[index].isFavorite
        },
        toggleTagTodo(index) {
            this.todos[index].showTagOptions = !this.todos[index].showTagOptions
        }
    }
}
</script>

<template>
    <nav>        
        <button @click="filterFavs">Toggle Favs</button>
    </nav>

    <p>You have {{ totalTodos }} left to do.</p>

    <div>
        <input type="text" @keyup.enter="addTodo" placeholder="buy groceries" v-model="todoInput">
        <button class="green-btn" @click="addTodo">Add Todo</button>
        <!-- 
        ~~1. add whatever is in the input to the todolist~~
        ~~2. do the same thing when hitting enter or the button~~
        ~~3. show todos in list on the screen~~
        ~~4. todos have state uncompleted|completed( completed will be greyed out and crossed through)~~
        ~~5. todo can be deleted, removed from the todolist~~
        6. you can add a due date to a todo
        7. you can tag a todo with a color [IN PROGRESS]
        ~~8. make todos draggable/change order~~
        ~~9. don't allow duplicates~~
        ~~10. add todo to favs~~
        11. toggle show favs
        -->
    </div>

    <div v-if="todos.length" class="todo-container" @drop="onDrop(todoIndex)" @dragenter.prevent @dragover.prevent>
        <div v-for="todo, todoIndex in todos" :class="[
            todo.tag + '-tag',
            { todo }
        ]" draggable="true" @dragstart="startDrag($event, todoIndex)" :key="'todo' + todoIndex">
            <label :class="{ 'completed': todo.completed }">
                <input type="checkbox" v-model="todo.completed">
                {{ todo.name }}
            </label>

            <div class="icons">
                <i class="material-icons" :class="{'fav': todo.isFavorite}" @click="toggleFav(todoIndex)">star</i>

                <div class="tag-container">
                    <div v-if="todo.showTagOptions">
                        <input v-model="todo.tag" type="radio" value="white" checked="checked">
                        <label>White</label>
                        <input v-model="todo.tag" type="radio" value="red">
                        <label>Red</label>
                        <input v-model="todo.tag" class="blue" type="radio" value="blue">
                        <label>Blue</label>
                        <input v-model="todo.tag" type="radio" value="green">
                        <label>Green</label>
                        <input v-model="todo.tag" type="radio" value="purple">
                        <label>Purple</label>
                        <input v-model="todo.tag" type="radio" value="orange">
                        <label>Orange</label>
                    </div>
                    <i class="material-icons" @click="toggleTagTodo(todoIndex)">label</i>                    
                </div>
                
                <i class="material-icons" @click="deleteTodo(todoIndex)">delete</i>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* GENERIC OVERRIDES */
input[type='text'] {
    padding: 10px;
    text-align: center;
}

button {
    margin-left: 1em;
}

label {
    font-size: 1.2em;
    margin-bottom: .7em;
}

label>input {
    margin-right: 1em;
}

input[type='checkbox'] {
    height: 20px;
    width: 20px;
}

input[type='radio'] {
    height: 20px;
    width: 20px;
}

input[type='radio'].blue {
    background-color: blue;
}

/* CLASSES */
.completed {
    text-decoration: line-through;
}

.delete-btn {
    background-color: rgb(129, 46, 46);
}

.green-btn {
    background-color: rgb(31, 161, 101);
}

.todo {
    padding: 1em;
    border-radius: 10px 10px 10px 10px;
    margin-top: .8em;
    display: flex;
    width: 1000px;
    border: solid black 1px;
    color: black;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo-container {
    margin-top: 1em;
    background-color: gray;
    padding: 1em;
}

.todo label,
.todo .icons {
    display: inline-block;
}

.todo .icons {
    text-align: right;
}

.todo i {
    font-size: 1.7em;
    margin-left: 10px;
    cursor: pointer;
    color: #bbb;
}

.todo .fav {
    color: orange;
}

.todo i.active {
    color: #ff005d;
}

.white-tag {
    background-color: white;
}

.red-tag {
    background-color: red;
    color: white;
}

.blue-tag {
    background-color: blue;
    color: white;
}

.green-tag {
    background-color: green;
    color: white
}

.purple-tag {
    background-color: purple;
    color: white;
}

.orange-tag {
    background-color: orange;
    color: black;
}

.tag-container {
    display: inline-flex;
}
</style>