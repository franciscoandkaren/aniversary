import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./TimelineChallenge.css";
import Navigation from "../Navigation/Navigation";

const initialEvents = [
  { id: "1", text: "Nos conocimos 🌟" }, // 1
  { id: "2", text: "Nuestra primera cita 🍝" }, // 2
  { id: "3", text: "Nuestra primera foto juntos 📸" }, //9
  { id: "4", text: "Nuestro primer año nuevo juntos 🎆" }, //10
  { id: "5", text: "Dijimos 'Te amo' 💖" }, //6
  { id: "6", text: "Celebramos nuestro primer aniversario 🎉" }, //5
  { id: "7", text: "Nos dimos nuestro primer regalo 🎁" }, // 3
  { id: "8", text: "Primera canción dedicada 🎶" }, // 4
  { id: "9", text: "Nuestro primer día completo juntos 🌞💕" },
  { id: "10", text: "Hablamos de un futuro juntos 🏡" }, //7
  { id: "11", text: "Conocimos a nuestros padres 🤝" }, //8
];

const correctOrder = ["1", "2", "7", "8", "6", "5", "11", "10", "3", "4", "9"];

function SortableItem({ id, text, disabled }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#fdf1e7" : "#fffefc",
    border: "1px solid #e6d2b5",
    padding: "12px 18px",
    borderRadius: "12px",
    marginBottom: "12px",
    cursor: disabled ? "default" : "grab",
    boxShadow: isDragging
      ? "0 4px 12px rgba(0, 0, 0, 0.15)"
      : "0 2px 6px rgba(0, 0, 0, 0.05)",
    userSelect: disabled ? "none" : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {text}
    </div>
  );
}

export default function TimelineChallenge({ onPrev, onNext }) {
  const [items, setItems] = useState(initialEvents);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  // Aquí creamos ambos sensores, y desactivamos según isCorrect
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
    enabled: !isCorrect, // DESACTIVA cuando ya está correcto
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
    enabled: !isCorrect,
  });

  const sensors = useSensors(touchSensor, mouseSensor);

  const validateOrder = (newItems) => {
    const currentOrder = newItems.map((item) => item.id);
    return currentOrder.every((id, idx) => id === correctOrder[idx]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      const valid = validateOrder(newItems);
      setIsCorrect(valid);
      setAttempts((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isCorrect) {
      const el = document.querySelector(".next-hint");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isCorrect]);

  return (
    <div className="timeline-container">
      <h4>Ordena los momentos de nuestra historia ❤️</h4>
      <DndContext
        sensors={sensors} // siempre el mismo array, sensores activados o no
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              text={item.text}
              disabled={!!isCorrect} // bloquea drag cuando es correcto
            />
          ))}
        </SortableContext>
      </DndContext>

      {isCorrect !== null && (
        <div
          className={`validation-message ${
            isCorrect ? "correct" : "wrong"
          } fade-in`}
        >
          {isCorrect ? (
            <>
              ¡Perfecto! 🥰 El orden es correcto. Si piensas que no, podemos debatirlo. Jaja.
              <br />
              <span className="next-hint">Puedes continuar ➡️</span>
              <Navigation onPrev={onPrev} onNext={onNext} />
            </>
          ) : (
            <>
              Ups... todavía no está bien 😅
              <br />
              {attempts > 1 && (
                <span className="hint">
                  Tip: recuerda nuestra primera salida... 😉
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
