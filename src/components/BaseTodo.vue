<script>
export default {
    data() {
        return {
            todos: [],
            todoInput: '',
            draggingIndex: null
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

            this.todos.push({ name: this.todoInput, completed: false})
            this.todoInput = ''
        },
        deleteTodo(index) {
            this.todos.splice(index, 1) //the second argument here specifies how many elements to remove
        },
        toggleCompleted(index) {
            this.todos[index].completed = !this.todos[index].completed
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
        }
    }
}
</script>

<template>
    <div>
        <input type="text" @keyup.enter="addTodo" placeholder="buy groceries" v-model="todoInput">
        <button class="greenBtn" @click="addTodo">Add Todo</button>

        <!-- 
        ~~1. add whatever is in the input to the todolist~~
        ~~2. do the same thing when hitting enter or the button~~
        ~~3. show todos in list on the screen~~
        ~~4. todos have state uncompleted|completed( completed will be greyed out and crossed through)~~
        ~~5. todo can be deleted, removed from the todolist~~
        6. you can add a due date to a todo
        7. you can tag a todo with a color
        ~~8. make todos draggable/change order~~
        ~~9. don't allow duplicates~~
        -->
    </div>

    <div v-if="todos.length" class="todoContainer" @drop="onDrop(todoIndex)" @dragenter.prevent @dragover.prevent>
        <div @dragstart="startDrag($event, todoIndex)" 
            draggable="true" 
            @click="toggleCompleted(todoIndex)" 
            class="todo" 
            v-for="todo, todoIndex in todos" :key="'todo' + todoIndex">
            <label :class="{ 'completed': todo.completed }">
                <input type="checkbox" v-model="todo.completed">
                {{ todo.name }}

            </label>
            <button @click="deleteTodo(todoIndex)" class="deleteBtn">delete</button>
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
    margin-bottom: .7em;
}

label>input {
    margin-right: 1em;
}

input[type='checkbox'] {

    height: 20px;
    width: 20px;
}

/* CLASSES */
.completed {
    text-decoration: line-through;
}

.deleteBtn {
    background-color: rgb(129, 46, 46);
}

.greenBtn {
    background-color: rgb(31, 161, 101);
}

.todo {
    padding: 1em;
    border-radius: 10px 10px 10px 10px;
    margin-top: .8em;
    display: flex;
    align-items: baseline;
    width: 1000px;
    justify-content: space-between;
    background-color: #e5f0ef;
    border: solid black 1px;
    color: black
}

.todoContainer {
    margin-top: 1em;
    background-color: gray;
    padding: 1em;    
}
</style>