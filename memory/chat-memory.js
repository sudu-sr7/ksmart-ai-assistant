const memory = [];

function saveMessage(role, content) {

  memory.push({
    role,
    content
  });

  if (memory.length > 10) {
    memory.shift();
  }
}

function getMemory() {
  return memory;
}

function clearMemory() {
  memory.length = 0;
}

module.exports = {
  saveMessage,
  getMemory,
  clearMemory
};