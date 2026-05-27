import { useRef } from 'react';
import Slider from 'react-slick';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const teamMembers = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Lead AI Researcher',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkYXRhJTIwc2NpZW50aXN0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NzA1ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'PhD in Computer Vision with 10+ years of experience in deep learning and neural networks. Specializes in CNN architectures and image classification.',
  },
  {
    name: 'James Chen',
    role: 'Machine Learning Engineer',
    image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHNvZnR3YXJlJTIwZW5naW5lZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzk3MDU4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Expert in TensorFlow and Keras with focus on production ML systems. Built and deployed multiple computer vision models for real-world applications.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Data Scientist',
    image: 'https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYWklMjByZXNlYXJjaGVyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3OTcwNTg2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Specialized in dataset curation and model evaluation. Led the training process using the Animals-10 dataset with expertise in data preprocessing.',
  },
  {
    name: 'Emily Watson',
    role: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzk2NTkyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Frontend and backend expert who designed and developed this web application. Passionate about creating intuitive user interfaces for AI applications.',
  },
];

export function AboutPage() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl">About Our Project</h1>
          <p className="text-muted-foreground text-lg">
            Meet the team behind the Animal Species Prediction system
          </p>
        </div>

        {/* Team Slider */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Slider ref={sliderRef} {...settings}>
                {teamMembers.map((member, index) => (
                  <div key={index} className="outline-none">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-[400px] md:h-auto">
                        <ImageWithFallback
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
                        <div>
                          <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                          <p className="text-primary font-medium">{member.role}</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {member.description}
                        </p>
                        <div className="flex gap-3 pt-4">
                          <Button variant="outline" size="icon">
                            <Github className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              
              {/* Custom Navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-10">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full pointer-events-auto shadow-lg"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full pointer-events-auto shadow-lg"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Description */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-center">About the Project</h2>
          
          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Overview</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The Animal Species Prediction project is a deep learning and computer vision application designed to classify images into ten different animal categories. The project was built as a hands-on learning experience to understand how Convolutional Neural Networks (CNNs) and transfer learning work in real-world image classification tasks.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Using the Animals-10 dataset from Kaggle, the model can identify:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Dog</li>
                  <li>Cat</li>
                  <li>Horse</li>
                  <li>Spider</li>
                  <li>Butterfly</li>
                  <li>Chicken</li>
                  <li>Sheep</li>
                  <li>Cow</li>
                  <li>Squirrel</li>
                  <li>Elephant</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Technology Stack</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  This project uses a fine-tuned EfficientNet Convolutional Neural Network (CNN) model trained with transfer learning. Instead of training a model completely from scratch, transfer learning was used to improve training efficiency and accuracy.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Technologies used:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>TensorFlow</li>
                  <li>Keras</li>
                  <li>EfficientNet Transfer Learning</li>
                  <li>React + TailwindCSS</li>
                  <li>NestJS</li>
                  <li>FastAPI</li>
                  <li>Supabase</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">How It Works</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  When a user uploads an image, the system preprocesses the image and passes it through the trained EfficientNet model. The CNN extracts visual features such as edges, textures, shapes, and patterns to determine the most likely animal species.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The model then returns:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-3">
                  <li>predicted animal category</li>
                  <li>confidence score</li>
                  <li>classification result</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  This project was mainly developed to understand:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>CNN architectures</li>
                  <li>image preprocessing</li>
                  <li>transfer learning</li>
                  <li>model training workflow</li>
                  <li>AI inference systems</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Dataset</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The model was trained using the Animals-10 dataset from Kaggle, which contains thousands of labeled images across ten animal categories. The dataset was divided into training, validation, and testing sets to evaluate model performance more effectively.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Model Performance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The final EfficientNet transfer learning model is designed to classify images across the Animals-10 dataset categories.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
