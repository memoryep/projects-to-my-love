import turtle as tu

t = tu.Turtle()
t.speed(10)
t.hideturtle()
tu.bgcolor("black")
t.color("white")

l = 320

t.penup()
t.goto(0, -120)
t.pendown()

for i in range(40):
    t.setheading(140)
    t.forward(l)
    t.circle(-l / 2, 200)
    t.setheading(60)
    t.circle(-l / 2, 200)
    t.forward(l)

    t.penup()
    t.right(10)
    t.forward(l * 0.03)
    t.setheading(0)

    l *= 0.91
    t.pendown()

tu.done()