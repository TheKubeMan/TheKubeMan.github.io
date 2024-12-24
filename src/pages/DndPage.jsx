import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        done: {
            name: "Done",
            items: [],
        },
        giveSomeoneElse: {
            name: "Give someone else",
            items: [],
        },
    });

    let nav = useNavigate();
    const redirect = () => {
        nav('/');
    };

    const deleteTodo = (id) => {
        setColumns({
            ...columns,
            todo: { 
                name: 'To Do',
                items: columns.todo.items.filter((thing) => thing.id !== id),
            },
            inProgress: {
                name: 'In Progress',
                items: columns.inProgress.items.filter((thing) => thing.id !== id),
            },
            done: {
                name: "Done",
                items: columns.done.items.filter((thing) => thing.id !== id),
            },
            giveSomeoneElse: {
                name: "Give someone else",
                items: columns.giveSomeoneElse.items.filter((thing) => thing.id !== id),
            },
        });
    };

    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });
        } else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    return (
        <div className='flex flex-col justify-center space-y-4'>
            <button className='border-white hover:bg-white hover:text-black' onClick={redirect}>To list</button>
            <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                margin: '0 20px',
                                marginBottom: '10px',
                            }}
                            key={columnId}>
                                <h2>{column.name}</h2>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div 
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                                                padding: 4,
                                                width: 250,
                                                minHeight: 500,
                                            }}
                                            >
                                                {column.items.map((item, index) => (
                                                    <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                    >
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div 
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    userSelect: 'none',
                                                                    padding: 16,
                                                                    margin: '0 0 8px 0',
                                                                    minHeight: '50px',
                                                                    backgroundColor: snapshot.isDragging
                                                                    ? '#263B4A' : 
                                                                    column.name == 'To Do' 
                                                                        ? '#2563eb' : 
                                                                        column.name == 'In Progress' ? '#ca8a04' :
                                                                            column.name == 'Done' ? 'green' : '#456C86',
                                                                    color: 'white',
                                                                    borderRadius: '10px',
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                                >
                                                                    {item.content}
                                                                    &ensp;
                                                                    <button className='bg-red-600 border-white' onClick={() => deleteTodo(item.id)}>Remove</button>
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default DndPage;