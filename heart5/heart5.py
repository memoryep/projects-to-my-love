import turtle as t
import math as m
import random as r

SCALE = 100

s = t.Screen()
s.setup(600, 700)
s.bgcolor("#050002")
s.tracer(0)

p = t.Turtle()
p.hideturtle()
p.penup()
p.speed(0)


def heart(u):
    x = 1.6 * (m.sin(u) ** 3)

    y = (
        1.3 * m.cos(u)
        - 0.5 * m.cos(2 * u)
        - 0.2 * m.cos(3 * u)
        - 0.1 * m.cos(4 * u)
    )

    return x, y


N = 2000
pts = []

for _ in range(N):
    u = r.uniform(0, 2 * m.pi)

    hx, hy = heart(u)

    rad = m.sqrt(r.random())

    x = hx * rad
    y = hy * rad

    z = 1.1 * (1 - rad) * r.uniform(-1, 1)

    pts.append((x, y, z))


def get_col(f):
    f = max(0.0, min(1.0, f))

    r1, g1, b1 = 70, 0, 10
    r2, g2, b2 = 255, 30, 50

    red = int(r1 + (r2 - r1) * f)
    green = int(g1 + (g2 - g1) * f)
    blue = int(b1 + (b2 - b1) * f)

    return f"#{red:02x}{green:02x}{blue:02x}"


theta = 0
step = 0.7


def loop():
    global theta

    p.clear()

    ct = m.cos(theta)
    st = m.sin(theta)

    proj = []

    for x, y, z in pts:
        xr = x * ct + z * st
        zr = -x * st + z * ct

        proj.append((xr, y, zr))

    
    proj.sort(key=lambda v: v[2])

    for xr, y, zr in proj:
        depth = (zr + 1.1) / 2.2

        p.goto(xr * SCALE, y * SCALE)

        p.color(get_col(depth))

        dot_size = 2 + (depth * 2.5)

        p.dot(dot_size)

    s.update()

    theta += step

    s.ontimer(loop, 25)


loop()

t.mainloop()