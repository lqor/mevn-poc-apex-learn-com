<template>
    <div class="container">
        <div class="task">
            <p class="task-description">Task #1</p>
            <p>Create a class <code>Car</code> with a string public string variable <code>motor</code>.</p>
        </div>
        <div class="code">
            <textarea class="code-input" placeholder="Write your code here..."></textarea>
            <button class="submit-button" @click="submit">Submit</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        submit() {
            // Add your submit logic here
            window.location.href='/send';
        },
        unauthenticate() {
            // Add your unauthenticate logic here
            window.location.href='/unauthenticate';
        }
    }
}
</script>

<style scoped>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: auto;
            overflow: hidden;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 20px;
            margin: 150px auto;

        }
        
        .task-description {
            font-weight: bold;
        }
        
        .code-input {
            width: 95%;
            height: 150px;
            padding: 10px;
            margin-bottom: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-family: 'Arial', sans-serif;
            font-size: 16px;
        }
        
        .submit-button {
            display: block;
            width: 100%;
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
        }
        
        .submit-button:hover {
            background-color: #4cae4c;
        }
        
        .task p,
        .task code {
            margin: 0;
            padding: 5px;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        code {
            font-family: 'Courier New', Courier, monospace;
            background-color: #eee;
            padding: 2px 5px;
        }
        
        /* Responsive layout for smaller screens */
        @media (max-width: 600px) {
            .container {
                grid-template-columns: 1fr;
            }
        
            .task, .code {
                width: 100%;
            }
        }
</style>