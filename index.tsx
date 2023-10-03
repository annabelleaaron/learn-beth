import {Elysia} from "elysia";
import {html} from "@elysiajs/html";
import * as elements from "typed-html";

const app = new Elysia()
    .use(html())
    .get("/", ({html}) => 
        html(
        <BaseHtml>
            <body class="flex w-full h-screen justify-center items-center"
            hx-get="/todos"
            hx-trigger="load"
            hx-swap="innerHTML">
            </body>
        </BaseHtml>
        )
    )
    .get("/todos", () => <TodoList todos={db}/>)
    .post()
    .listen(3000);
console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

const BaseHtml = ({children}: elements.Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THE BETH STACK</title>
    <script src="https://unpkg.com/htmx.org@1.9.6" integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

${children}
`;

type Todo = {
    id: number;
    content: string;
    completed: boolean;
};

const db: Todo[] = [
    {id: 1, content: "learn the beth stack", completed: true},
    {id: 2, content: "learn vim", completed: false},
];

function TodoItem({content,completed,id}: Todo){
    return(
        <div class="flex flex-row-space-x-3">
            <p>{content}</p>
            <input type="checkbox" checked={completed}/>
            <button class="text-red-500">X</button>
        </div>
    );
};

function TodoList({todos}:{todos:Todo[]}){
    return(
        <div>
            {todos.map((todo) => (
                <TodoItem {...todo}/>
            ))}
        </div>
    )
}