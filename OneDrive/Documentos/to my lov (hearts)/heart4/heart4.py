import turtle as t
import math as m
import random as r

s = t.Screen()
s.setup(600, 600)
s.bgcolor("black")
s.tracer(0)

p = t.Turtle()
p.hideturtle()
p.speed(0)


def heart(u):
    x = 16 * (m.sin(u) ** 3)

    y = (
        13 * m.cos(u)
        - 5 * m.cos(2 * u)
        - 2 * m.cos(3 * u)
        - m.cos(4 * u)
    )

    return x, y


rays = []

for i in range(140):
    u = (i / 140) * 2 * m.pi + r.uniform(-0.02, 0.02)

    hx, hy = heart(u)

    length = r.uniform(9.8, 11.2)

    rays.append((hx * length, hy * length))


step = 0


def loop():
    global step

    p.clear()

    t_val = (step % 48) / 24.0

    if t_val <= 1.6:
        p.width(1)

        head = min(1.0, t_val)
        tail = max(0.0, t_val - 0.35)

        fade = (
            max(0, 1.0 - (t_val - 0.7))
            if t_val > 0.7
            else 1.0
        )

        red_c = int(170 * fade)

        p.color(f"#{red_c:02x}001a")

        for hx, hy in rays:
            x1, y1 = hx * tail, hy * tail
            x2, y2 = hx * head, hy * head

            p.penup()
            p.goto(x1, y1)

            p.pendown()
            p.goto(x2, y2)

            if t_val < 0.9:
                p.penup()
                p.goto(x2, y2)

                p.color("#ff1a40")
                p.dot(1.8)

                p.color(f"#{red_c:02x}001a")

    s.update()

    step += 1

    s.ontimer(loop, 25)


loop()

t.mainloop()