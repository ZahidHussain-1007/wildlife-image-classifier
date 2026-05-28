import { BrainCircuit, Database, Github, Linkedin, Mail, Server, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const animalClasses = [
  'Dog',
  'Cat',
  'Horse',
  'Spider',
  'Butterfly',
  'Chicken',
  'Sheep',
  'Cow',
  'Squirrel',
  'Elephant',
];

const technologies = [
  'TensorFlow',
  'Keras',
  'EfficientNetB3 Transfer Learning',
  'React + TailwindCSS',
  'NestJS',
  'FastAPI',
  'Supabase',
];

const learningGoals = [
  'CNN architectures',
  'image preprocessing',
  'transfer learning',
  'model training workflow',
  'AI inference systems',
];

const contributors = [
  {
    name: 'Zahid Hussain',
    role: 'Frontend and Backend Development',
    linkedin:
      'https://www.linkedin.com/in/zahid-hussain-b65b64390/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BYYUzpdfrRsiUsn8WZKsrvg%3D%3D',
    github: 'https://github.com/ZahidHussain-1007',
    email: 'zahidhussain9246@gmail.com',
  },
  {
    name: 'Deekshanth',
    role: 'Research and Project Architecture Design',
    linkedin:
      'https://www.linkedin.com/in/perisetty-deekshanth-b85b43402/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BITLQjzkBSSGRkRZfowY7lQ%3D%3D',
    github: 'https://github.com/Deekshanth607',
    email: 'perisettydeekshanth@gmail.com',
  },
  {
    name: 'Pranav Reddy',
    role: 'Database and Google OAuth Integration',
    linkedin: 'https://www.linkedin.com/in/doni-pranav-reddy-588918371',
    github: 'https://github.com/Pranavdotexe',
    email: 'pranvreddy3@gmail.com',
  },
  {
    name: 'Daryl Joseph',
    role: 'Model Development and FastAPI Integration',
    linkedin: 'https://www.linkedin.com/in/daryl-joseph-j-a13217406',
    github: 'https://github.com/Daryl-Joseph',
    email: 'daryljoseph8123@gmail.com',
  },
];

const resultItems = ['predicted animal category', 'confidence score', 'classification result'];

export function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1 text-sm text-muted-foreground">
            <BrainCircuit className="h-4 w-4 text-primary" />
            CNN learning project
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
              Animal Species Prediction
            </h1>
            <p className="text-base leading-7 text-muted-foreground md:text-lg">
              A deep learning and computer vision application built as a first-time,
              hands-on exploration of image classification with Convolutional Neural
              Networks and transfer learning.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                Dataset
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Animals-10 from Kaggle, split into training, validation, and testing
              sets for model evaluation.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Server className="h-5 w-5 text-primary" />
                Model
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              EfficientNetB3 transfer learning model using TensorFlow and Keras for animal
              image classification.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5 text-primary" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              The final model achieved 98.20% test accuracy on the
              Animals-10 dataset.
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="leading-7">
                The Animal Species Prediction project is a deep learning and computer
                vision application designed to classify images into ten different animal
                categories. The project was built as a hands-on learning experience to
                understand how Convolutional Neural Networks (CNNs) and transfer learning
                work in real-world image classification tasks.
              </p>
              <p className="leading-7">
                Using the Animals-10 dataset from Kaggle, the model can identify:
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {animalClasses.map((animal) => (
                  <span
                    key={animal}
                    className="rounded-md border bg-secondary px-3 py-2 text-center text-sm text-secondary-foreground"
                  >
                    {animal}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                This project uses EfficientNetB3, a pre-trained Convolutional Neural Network
                model trained on the ImageNet dataset containing millions of images.
                Instead of training completely from scratch, transfer learning was used
                to improve training efficiency and accuracy.
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                When a user uploads an image, the system preprocesses the image and
                passes it through the trained EfficientNetB3 model. The CNN extracts visual
                features such as edges, textures, shapes, and patterns to determine the
                most likely animal species.
              </p>
              <div>
                <p className="mb-2 text-foreground">The model returns:</p>
                <ul className="list-inside list-disc space-y-1">
                  {resultItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                This project was mainly developed to understand the practical workflow
                behind training and serving a computer vision model.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {learningGoals.map((goal) => (
                  <li key={goal} className="rounded-md border px-3 py-2">
                    {goal}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Contributors</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              A student developer team contributed across the frontend, backend, model,
              database, authentication, research, and system design work.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contributors.map((contributor) => (
              <Card key={contributor.email} className="h-full">
                <CardContent className="flex h-full flex-col gap-5 p-5">
                  <div className="space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-lg font-semibold text-primary-foreground">
                      {contributor.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{contributor.name}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {contributor.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Button asChild variant="outline" size="icon" aria-label={`${contributor.name} GitHub`}>
                      <a href={contributor.github} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon" aria-label={`${contributor.name} LinkedIn`}>
                      <a href={contributor.linkedin} target="_blank" rel="noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="icon" aria-label={`Email ${contributor.name}`}>
                      <a href={`mailto:${contributor.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
