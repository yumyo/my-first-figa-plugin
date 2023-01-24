figma.showUI(__html__);

figma.ui.resize(480, 480);

figma.ui.onmessage = async(pluginMessage) => {

  await figma.loadFontAsync({ family:'Rubik', style: 'Regular'})

  const postComponentSet = figma.root.findOne( Node => Node.type == 'COMPONENT_SET' && Node.name == 'post') as ComponentSetNode;

  let selectedVariant;

  if (pluginMessage.darkModeState === true) {
    switch(pluginMessage.imageVariant) {
      case "2":
        selectedVariant = figma.root.findOne( Node => Node.type == 'COMPONENT' && Node.name == 'Image=single, Dark mode=true' ) as ComponentNode;
        break;
      case "3":
        selectedVariant = figma.root.findOne( Node => Node.type == 'COMPONENT' && Node.name == 'Image=carousel, Dark mode=true' ) as ComponentNode;
        break;
      default:
        selectedVariant = figma.root.findOne( Node => Node.type == 'COMPONENT' && Node.name == 'Image=none, Dark mode=true' ) as ComponentNode;
      break;
    }
  } else {
    switch(pluginMessage.imageVariant) {
      case "2":
        selectedVariant = figma.root.findOne( Node => Node.type == 'COMPONENT' && Node.name == 'Image=single, Dark mode=false' ) as ComponentNode;
        break;
      case "3":
        selectedVariant = figma.root.findOne( Node => Node.type == 'COMPONENT' && Node.name == 'Image=carousel, Dark mode=false' ) as ComponentNode;
        break;
      default:
        selectedVariant = postComponentSet.defaultVariant as ComponentNode;
      break;
    }
  }
  // defaultVariant.createInstance();

  // console.log(postComponentSet)
  // console.log(postComponentSet.children)
  // console.log(postComponentSet.name)

  // console.log(pluginMessage.name)
  // console.log(pluginMessage.username)
  // console.log(pluginMessage.description)
  // console.log(pluginMessage.darkModeState )
  // console.log(pluginMessage.imageVariant)

  const newPost = selectedVariant.createInstance();
  
  const templateName = newPost.findOne( Node => Node.name == 'displayName' && Node.type == 'TEXT') as TextNode;
  const templateUsername= newPost.findOne( Node => Node.name == '@username' && Node.type == 'TEXT') as TextNode;
  const templateDescription = newPost.findOne( Node => Node.name == 'description' && Node.type == 'TEXT') as TextNode;

  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;
  // console.log(templateName.characters)
  // console.log(templateUsername.characters)
  // console.log(templateDescription.characters)

  figma.closePlugin();
}