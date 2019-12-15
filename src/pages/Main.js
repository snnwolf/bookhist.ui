import React from "react";
import { Input, section, Timeline } from "antd";

const bookList = [
    {
        name: "Начало времён",
        author: "Азимов Айзек"
    },
    {
        name: "Ночной дозор",
        author: "Лукьяненко Сергей"
    }
];

export default function Main(props) {
    return (
        <React.Fragment>
            <section>
                <Input.Search
                    placeholder="Что ищем?"
                    onSearch={value => console.log("Ищем...", value)}
                    enterButton
                />
            </section>
            <section>
                <Timeline>
                    {bookList.length &&
                        bookList.map((item, index) => (
                            <Timeline.Item key={index}>
                                {item.author} {item.name} 10.11.2019
                            </Timeline.Item>
                        ))}
                </Timeline>
            </section>
        </React.Fragment>
    );
}
