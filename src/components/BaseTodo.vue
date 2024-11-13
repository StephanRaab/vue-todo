<script>
export default {
    data() {
        return {
            todos: [],
            todoInput: '',
            isCompleted: false
        }
    },
    methods: {
        addTodo() {
            if (this.todoInput.trim() === '') {
                return
            }

            this.todos.push(this.todoInput)
            this.todoInput = ''
        }
    }
}
</script>

<template>
    <div>
        <input @keyup.enter="addTodo" placeholder="buy groceries" v-model="todoInput">
        <button @click="addTodo">Add Todo</button>

        <!-- 
        ~~1. add whatever is in the input to the todolist~~
        ~~2. do the same thing when hitting enter or the button~~
        ~~3. show todos in list on the screen~~
        4. todos have state uncompleted|completed( completed will be greyed out and crossed through)
        5. todo can be deleted, removed from the todolist
        6. you can add a due date to a todo
        7. you can tag a todo with a color
        8. make todos draggable/change order
        -->
    </div>

    <label v-bind:class="(isCompleted) ? 'completed' : ''" v-for="todo, todoIndex in todos" :key="'todo' + todoIndex">
        <input type="checkbox" v-model="isCompleted">
        {{ todo }}
    </label>
</template>

<style scoped>
/* GENERIC OVERRIDES */
input {
    height: 34px;
    text-align: center;
}

button {
    margin-left: 1em
}

label {
    display: flex;
    align-items: center;
}

label>input {
    margin-right: 1em;
}

/* CLASSES */
.completed {
    text-decoration: line-through;
}
</style>