import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  kb: [
    {
      type: 'doc',
      id: 'index',
      label: '🗺️ Overview',
    },
    {
      type: 'category',
      label: '☕ Java & JVM',
      collapsed: false,
      items: [
        'java/java-core',
        'java/java-ee',
        'java/spring-boot',
      ],
    },
    {
      type: 'category',
      label: '🌐 Web Development',
      collapsed: true,
      items: [
        'web/react',
      ],
    },
    {
      type: 'category',
      label: '☁️ Cloud Computing',
      collapsed: true,
      items: [
        'cloud/aws-cloud-practitioner',
        'cloud/oracle-cloud-oci',
        'cloud/oracle-cloud-genai',
      ],
    },
    {
      type: 'category',
      label: '🐳 DevOps',
      collapsed: true,
      items: [
        'devops/docker',
        'devops/kubernetes',
        'devops/github-foundations',
      ],
    },
    {
      type: 'category',
      label: '🤖 Artificial Intelligence',
      collapsed: true,
      items: [
        'ai/google-ai-professional',
        'ai/ai-for-everyone',
      ],
    },
    {
      type: 'category',
      label: '🔐 Cybersecurity',
      collapsed: true,
      items: [
        'security/cybersecurity-fundamentals',
      ],
    },
    {
      type: 'category',
      label: '🏗️ Software Engineering',
      collapsed: true,
      items: [
        'engineering/software-engineering',
        'engineering/system-design',
      ],
    },
    {
      type: 'category',
      label: '🔄 Agile',
      collapsed: true,
      items: [
        'agile/scrum',
      ],
    },
  ],
};

export default sidebars;
