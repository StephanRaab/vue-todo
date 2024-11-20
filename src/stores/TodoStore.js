import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [],
        todoInput: '',
        draggingIndex: null,
        tag: 'white',
        totalTodos: 0,
        filter: false,
        todoBackup: [],
        showTagTodo: false,
        isLoading: false
    }),
    actions: {
        getLocalStoredTodos() {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                this.todos = JSON.parse(storedTodos)
                this.totalTodos = this.todos.filter(todo => !todo.completed).length;                
            }
        },
        setLocalTodoStore() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        // actions are called methods in the component
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
            this.setLocalTodoStore()      
        },
        deleteTodo(index) {
            this.todos.splice(index, 1) //the second argument here specifies how many elements to remove
            this.totalTodos = this.totalTodos - 1
            this.setLocalTodoStore()
        },
        markTodoDone(event) {
            if (event.srcElement.checked) {
                this.totalTodos = this.totalTodos - 1
            } else {
                this.totalTodos = this.totalTodos + 1
            }
            this.setLocalTodoStore()      
        },
        tagTodo(index) {
            this.setLocalTodoStore()
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
            this.setLocalTodoStore()
        },
        toggleTagTodo(index) {
            this.todos[index].showTagOptions = !this.todos[index].showTagOptions
            this.setLocalTodoStore()
        }
    }
})